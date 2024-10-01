$(document).ready(function () {
  $.ajax({
    url: "gallery.json",
    method: "get",
    dataType: "json",
    success: function (data) {
      //   console.log(data);
      // data.forEach(function(){})
      $.each(data, function (index, item) {
        // console.log(index);
        // console.log(item);
        let galleryItem = `
         <div class="gallery_item">
                <img src="${item.img}" alt="${item.title}">
                <div class="item_desc">
                    <h1>${item.title}</h1>
                    <p>${item.dec}</p>
                </div>
             </div>
        `;
        $(".gallery_wrap").append(galleryItem);
        // 클릭시 디테일 아이템 추가
        let detailItem = `
         <div class="gallery_detail">
                <div class="gallery_detail_wrap">
                    <div class="detail_left">
                        <img src="${item.img}" alt="${item.title}">
                    </div>
                    <div class="detail_right">
                        <div class="content">
                            <h1 class="detail_title"> ${item.title}</h1>
                            <div class="title_line"></div>
                            <p class="deail_sub">${item.info}</p>
                        </div>
                    </div>
                    <span> &times; </span>
                </div>
              </div>
        `;
        $(".gallery_wrap").append(detailItem);
      });
    //   아이템에 클릭했을때 디테일 내용이 나옴
    $(".gallery_item").click(function(){
        $(this).next(".gallery_detail").show()
    })
    $(".gallery_detail_wrap span").click(function(){
        $(".gallery_detail").hide()
    })
    },
    error: function (status, error) {
      console.log("오류:", status, error);
    },
  });
});
