window.onload = function () {
  const postTieleInput = document.getElementById("postTitle");
  const postContentInput = document.getElementById("postContent");
  const postImageInput = document.getElementById("postImage");
  const addPostBtn = document.getElementById("addPostBtn");
  const postList = document.getElementById("postList");
  const postDateInput = document.getElementById("postDate");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const clearBtn = document.getElementById("clearBtn");
  const deleteAllBtn = document.getElementById("deleteAllBtn");
  // 저장된 게시글 배열
  let posts = [];
  console.log(posts);
  if (localStorage.getItem("posts")) {
    // 만약에 posts라는 키로 저장된 데이터가 있다면,
    // addPostToDOM()
    posts = JSON.parse(localStorage.getItem("posts"));
    // 저장된 게시글을 화면에 표시
    for (const post of posts) {
      addPostToDOM(post);
    }
  }
  //   posts.forEach(addPostToDOM);
  // 게시글 추가 함수
  function addPostToDOM(post) {
    const postElement = document.createElement("li");
    postElement.classList.add("post");
    console.log(postElement);
    postElement.innerHTML = `
    <div class="post-content">
          <h2>${post.title}</h2>
       <!-- 날짜가 있으면 <p> Date : ${post.date} </p> 아니면 빈배열 -->
          ${post.date ? `<p> Date : ${post.date} </p>` : ""} 
          <div class="post-details">
            <p> ${post.content}</p>
             <!-- 이미지가 있으면 <img src="${post.Image}" alt="게시글 이미지" /> 아니면 빈배열 -->
           ${post.Image ? `<img src="${post.Image}" alt="게시글 이미지" />` : ""} 
          </div>
          <button class="delete-post-btn">닫기</button>
    </div>
    `;
    // 닫기 버튼에 클릭 이벤트 기능
    const deletButton = postElement.querySelector(".delete-post-btn");
    deletButton.addEventListener("click", function () {
      // 게시글을 삭제하고 화면에서 제거
      const postLi = posts.indexOf(post);
      // console.log(postLi);
      if (postLi !== -1) {
        // 인덱스 번호가 존재한다면
        posts.splice(postLi, 1);
        localStorage.setItem("posts", JSON.stringify(posts));
        postElement.remove();
      }
    });
    // prepend() 부모요소의 맨앞에 새작식요소를 추가
    postList.prepend(postElement);
  }
  //   게시글 작성 버튼을 클릭했을때 이벤트
  addPostBtn.addEventListener("click", function () {
    const title = postTieleInput.value;
    const content = postContentInput.value;
    const imageFile = postImageInput.files[0];
    // console.log(imageFile);
    const date = postDateInput.value;
    if (title && content) {
      // 이미지를 base64형식으로 변환
      const reader = new FileReader();
      reader.onload = function () {
        // 새 게시글 객체 생성
        const newPost = {
          title,
          content,
          Image: reader.result, // 이미지를 base64형식으로 변환
          date: date || null,
        };
        // 배열에 게시글 추가
        posts.push(newPost);
        console.log(posts);
        localStorage.setItem("posts", JSON.stringify(posts));
        // 화면에 게시글 추가
        addPostToDOM(newPost);
      };
      if (imageFile) {
        reader.readAsDataURL(imageFile); //이미지 파일을 abse64로 읽기
      } else {
        // 이미지가 없을 경우도 처리
        reader.onload();
      }
    }
  });
  //   검색기능 추가
  searchBtn.addEventListener("click", function () {
    const searchTerm = searchInput.value.toLowerCase();
    const filterPosts = posts.filter(function (post) {
      // console.log(post);
      return post.title.toLowerCase().includes(searchTerm) || post.content.toLowerCase().includes(searchTerm);
    });
    postList.innerHTML =""
    for(const post of filterPosts){
          // 화면에 게시글 추가
          addPostToDOM(post);
    }
  });
//   검색 지우기 버튼을 클릭 이벤트 처리
clearBtn.addEventListener("click",function(){
    // 기존 게시글 목록을 지우고 모든 게시글 표시
    postList.innerHTML =""
    searchInput.value=""
    for(const post of posts){
        addPostToDOM(post) 
    }

})
  //  전체 삭제
  deleteAllBtn.addEventListener("click", function () {
    if (confirm("정말 모든 게시글을 삭제하시겠습니까?")) {
      posts = [];
      localStorage.removeItem("posts");
      postList.innerHTML = "";
    }
  });
};
