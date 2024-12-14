document.addEventListener('DOMContentLoaded', function() {
    // ISO 搜索功能
    const searchInput = document.getElementById('iso-search-input');
    const isoCards = document.querySelectorAll('.iso-card');
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        isoCards.forEach(card => {
            const distroName = card.querySelector('h3').textContent.toLowerCase();
            if (distroName.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    // ISO 下载链接处理
    document.querySelectorAll('.iso-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const distro = this.closest('.iso-card').dataset.distro;
            const version = this.dataset.version;
            
            // 根据发行版和版本构建下载链接
            const downloadUrls = getDownloadUrls(distro, version);
            showDownloadModal(distro, version, downloadUrls);
        });
    });
});

function getDownloadUrls(distro, version) {
    // 这里可以根据实际的镜像路径规则构建下载链接
    const baseUrl = window.location.origin;
    const urls = {
        ubuntu: {
            '22.04': [
                {
                    name: 'Ubuntu 22.04 LTS (Desktop AMD64)',
                    url: `${baseUrl}/ubuntu-releases/22.04/ubuntu-22.04-desktop-amd64.iso`
                },
                {
                    name: 'Ubuntu 22.04 LTS (Server AMD64)',
                    url: `${baseUrl}/ubuntu-releases/22.04/ubuntu-22.04-live-server-amd64.iso`
                }
            ]
        },
        // 可以添加更多发行版的下载链接
    };
    
    return urls[distro]?.[version] || [];
}

function showDownloadModal(distro, version, urls) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'download-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>${distro.charAt(0).toUpperCase() + distro.slice(1)} ${version} 下载选项</h3>
            <div class="download-links">
                ${urls.map(url => `
                    <a href="${url.url}" class="download-link">
                        ${url.name}
                        <span class="download-icon">⭳</span>
                    </a>
                `).join('')}
            </div>
            <button class="modal-close">关闭</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 关闭模态框
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
} 