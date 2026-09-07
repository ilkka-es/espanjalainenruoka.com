import { execFileSync } from 'node:child_process'
import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const run = (args, options = {}) => execFileSync('git', [
  '-c', 'http.version=HTTP/1.1', '-c', 'http.postBuffer=16777216', ...args,
], {
  cwd: root, encoding: 'utf8', ...options,
}).trim()
const repo = run(['remote', 'get-url', 'origin'])
const name = run(['config', 'user.name'])
const email = run(['config', 'user.email'])
const temporary = mkdtempSync(path.join(tmpdir(), 'espanja-deploy-'))
const gitDir = path.join(temporary, 'repository.git')
run(['init', '--bare', gitDir])
const git = (args, options) => run([
  `--git-dir=${gitDir}`, `--work-tree=${path.join(root, 'dist')}`,
  '-c', `user.name=${name}`, '-c', `user.email=${email}`, ...args,
], options)

// Build a fresh index, preserving the remote branch as the commit parent.
// A bare repository avoids case-insensitive macOS checkout collisions.
git(['fetch', '--depth=1', repo, 'refs/heads/gh-pages'])
const parent = git(['rev-parse', 'FETCH_HEAD'])
git(['add', '--all', '--', '.'], { cwd: path.join(root, 'dist') })

const target = 'https://www.espanjalainenruoka.com/resepti/paras-sangria-ohje/'
const redirect = `<!doctype html><html lang="fi"><head><meta charset="UTF-8"><link rel="canonical" href="${target}"><meta http-equiv="refresh" content="0;url=${target}"><script>location.replace(${JSON.stringify(target)}+location.search+location.hash)</script><title>Sivu on siirtynyt</title></head><body><p>Sivu on siirtynyt: <a href="${target}">Paras sangria ohje</a></p></body></html>`
const blob = git(['hash-object', '-w', '--stdin'], { input: redirect })
git(['update-index', '--add', '--cacheinfo', '100644', blob, 'resepti/Paras-sangria-ohje/index.html'])
const empty = git(['hash-object', '-w', '--stdin'], { input: '' })
git(['update-index', '--add', '--cacheinfo', '100644', empty, '.nojekyll'])
const tree = git(['write-tree'])

// Verify both case-sensitive paths before anything is uploaded.
const recipe = git(['show', `${tree}:resepti/paras-sangria-ohje/index.html`])
if (!recipe.includes('seo-fallback') || recipe.includes('http-equiv="refresh"')) {
  throw new Error('Working sangria recipe was replaced by a redirect; deployment stopped.')
}
if (git(['show', `${tree}:resepti/Paras-sangria-ohje/index.html`]) !== redirect) {
  throw new Error('Legacy sangria redirect missing; deployment stopped.')
}

if (process.argv.includes('--dry-run')) {
  console.log('Deployment tree verified: original recipe and legacy redirect are separate. Nothing pushed.')
} else {
  const commit = git(['commit-tree', tree, '-p', parent, '-m', 'Publish website with legacy URL redirect'])
  git(['push', repo, `${commit}:refs/heads/gh-pages`])
  console.log('Published')
}
