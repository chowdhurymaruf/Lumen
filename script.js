const feed = document.getElementById("feed");

fetch("data/newsfeed.json")
  .then(res => res.json())
  .then(posts => {
    posts.forEach(function (p) {
      const tags = p.tags.map(t => `<a class="tag" href="under-construction.html">${t}</a>`).join("");

      feed.innerHTML += `
        <article class="post">
          <a href="under-construction.html"><img class="avatar" src="${p.avatar}" alt="${p.name}"></a>
          <div class="content">
            <div class="meta">
              <a class="author" href="under-construction.html">${p.name}</a>
              <span class="time">${p.time}</span>
            </div>
            <h3 class="title">${p.title}</h3>
            <p class="body">${p.body}</p>
            <div class="bottom">
              <div class="tags">${tags}</div>
              <div class="actions">
                <button class="action-btn like-btn"><img src="icons/like.png" alt="Like"><span class="count">${p.likes}</span></button>
                <button class="action-btn unlike-btn"><img src="icons/unlike.png" alt="Unlike"><span class="count">${p.unlikes}</span></button>
                <a class="action-btn" href="under-construction.html"><img src="icons/comment.png" alt="Comment"><span>${p.comments}</span></a>
              </div>
            </div>
          </div>
        </article>`;
    });
  });

// like / unlike
feed.addEventListener("click", function (e) {
  const like = e.target.closest(".like-btn");
  const unlike = e.target.closest(".unlike-btn");
  if (!like && !unlike) return;

  const card = e.target.closest(".post");
  const likeBtn = card.querySelector(".like-btn");
  const unlikeBtn = card.querySelector(".unlike-btn");
  const likeCount = likeBtn.querySelector(".count");
  const unlikeCount = unlikeBtn.querySelector(".count");

  if (like) {
    const liked = likeBtn.classList.toggle("active");
    likeCount.textContent = Number(likeCount.textContent) + (liked ? 1 : -1);

    if (unlikeBtn.classList.contains("active")) {
      unlikeBtn.classList.remove("active");
      unlikeCount.textContent = Number(unlikeCount.textContent) - 1;
    }
  }

  if (unlike) {
    const unliked = unlikeBtn.classList.toggle("active");
    unlikeCount.textContent = Number(unlikeCount.textContent) + (unliked ? 1 : -1);

    if (likeBtn.classList.contains("active")) {
      likeBtn.classList.remove("active");
      likeCount.textContent = Number(likeCount.textContent) - 1;
    }
  }
});