const modal=document.getElementById('modal');
const form=document.getElementById('reportForm');
const photoInput=document.getElementById('photo');
function openModal(){modal.classList.remove('hidden')}
function closeModal(){modal.classList.add('hidden')}
modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
if(photoInput){photoInput.addEventListener('change',()=>{const file=photoInput.files&&photoInput.files[0];if(!file)return;const reader=new FileReader();reader.onload=e=>{document.getElementById('previewImage').src=e.target.result;document.getElementById('photoPreview').classList.remove('hidden')};reader.readAsDataURL(file)})}
function clearPhoto(){if(photoInput)photoInput.value='';document.getElementById('previewImage').removeAttribute('src');document.getElementById('photoPreview').classList.add('hidden')}
form.addEventListener('submit',e=>{e.preventDefault();const title=document.getElementById('detail').value.trim();const loc=document.getElementById('location').value.trim();const level=document.getElementById('level').value;const type=document.getElementById('type').value;const hasPhoto=photoInput&&photoInput.files&&photoInput.files.length>0;const list=document.getElementById('reports');const color=level==='고위험'?'red':level==='주의'?'orange':'yellow';const row=document.createElement('div');row.className='report';row.innerHTML=`<span class="dot ${color}"></span><div><strong>${escapeHtml(title)}</strong><small>${escapeHtml(type)} · ${escapeHtml(loc)} · 방금 전${hasPhoto?' · 📷 사진첨부':''}</small></div><b>${level}</b>`;list.prepend(row);document.getElementById('reportCount').textContent=Number(document.getElementById('reportCount').textContent)+1;showToast('위험 신고가 등록되었습니다. 담당자에게 알림을 보냈습니다.');form.reset();clearPhoto();closeModal()});
function resolve(btn){const item=btn.closest('.alert-item');item.style.opacity='.45';btn.textContent='완료';btn.disabled=true;const count=document.getElementById('openCount');count.textContent=Math.max(0,Number(count.textContent)-1);showToast('조치 완료 처리되었습니다. 재점검 대상으로 등록합니다.')}
function zoneInfo(name,text){showToast(`${name}: ${text}`)}
function updateChecks(){const n=[...document.querySelectorAll('.check input')].filter(x=>x.checked).length;document.querySelector('.score').textContent=`${n} / 15`;document.querySelector('.progress span').style.width=`${Math.min(100,n/15*100)}%`}
function completeInspection(){showToast('오늘의 안전점검이 완료 처리되었습니다.')}
function showToast(text){const t=document.getElementById('toast');t.textContent=text;t.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove('show'),2800)}
function escapeHtml(s){return s.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}