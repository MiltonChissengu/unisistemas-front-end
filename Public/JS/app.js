// Read-only front-end catalog for users
const STORAGE_KEY_BOOKS = 'ceap_books_v1'
const qs = s=>document.querySelector(s)

const catalogList = qs('#catalogList')
const searchInput = qs('#searchInput')

let books = loadBooks() || sampleBooks()
renderCatalog()
searchInput.addEventListener('input', ()=>renderCatalog())

function loadBooks(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY_BOOKS))}catch(e){return null}}
function saveBooks(b){localStorage.setItem(STORAGE_KEY_BOOKS,JSON.stringify(b))}

function renderCatalog(){
  const term = (searchInput.value||'').toLowerCase().trim()
  const list = books.filter(b=>!term || [b.title,b.author,b.category].join(' ').toLowerCase().includes(term))
  catalogList.innerHTML = ''
  if(list.length===0){catalogList.innerHTML = '<p class="hint">Nenhum livro encontrado.</p>';return}
  list.forEach(b=>{
    const el = document.createElement('div')
    el.className = 'card'
    el.innerHTML = `
      <img src="${b.cover||''}" alt="">
      <div class="card-content">
        <small>${b.category || 'Sem categoria'}</small>
        <h4>${escapeHtml(b.title)}</h4>
        <small>${escapeHtml(b.author||'Desconhecido')} • ${b.pages||'-'} páginas</small>
      </div>
    `
    catalogList.appendChild(el)
  })
}

function sampleBooks(){
  const s = [
    { id:'b1', title:'Coletânea de textos sobre amor e compaixão', author:'Vários', category:'Reflexões Espirituais', pages:124, copies:2, cover:'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f' },
    { id:'b2', title:'Métodos de ensino para comunidades carentes', author:'Equipe CEAP', category:'Educação Social', pages:89, copies:1, cover:'https://images.unsplash.com/photo-1581090700227-1e37b190418e' },
    { id:'b3', title:'Guia prático para ações solidárias', author:'Coordenadoria', category:'Manual do Voluntário', pages:67, copies:3, cover:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e' }
  ]
  // save for potential admin use later
  try{saveBooks(s)}catch(e){}
  return s
}

function escapeHtml(str){ if(!str) return ''; return String(str).replace(/[&"'<>]/g, s=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[s])) }

// expose for future admin tooling
window.__lib_books = books
