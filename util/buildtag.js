exports.timeline = (data,alreadyLiked) => {
    return data.map((data) =>{
        return `   
            <div class="card-container">
                <div class="card-name">
                    <h5 class="medium">${data.nickname}님의 기록 ${data.createdAt}</h5>
                </div>
                <div class="card-box">
                    <span class="profile-img" style="background-image:url('/images/${data.Image}');"></span>
                    ${data.image!=='null' ? `<img src="/images/${data.image}">` : ""} 
                    <textarea class="card" readonly="readonly" disabled>${data.posts}</textarea>
                    <div class="icon-box">
                        <i class="@${data.postId} ${data.alreadyLiked ?'fas ': 'far '}fa-heart fa-2x" 
                                onclick="likeClick(event)"
                            />
                        ${data.likes_counts? '<div class="likes_counts">'+ data.likes_counts+'</div>': ''} 
                    </div>
                </div>
            </div>
        `
    })
    
}