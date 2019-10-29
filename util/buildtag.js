exports.timeline = (data) => {
    return data.map((data) =>{
        return `   
            <div class="card-container">
                <div class="card-name">
                    <h5 class="medium">${data.nickname}님의 기록 ${data.createdAt}</h5>
                </div>
                <div class="card-box">
                    <span class="profile-img" style="background-image:url('/images/${data.Image}');"></span>
                    <textarea class="card" readonly="readonly" disabled>${data.posts}</textarea>
                </div>
            </div>
        `
    })
}