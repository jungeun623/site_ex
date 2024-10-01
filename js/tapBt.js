window.addEventListener("load", function () {
  const tabtitle = this.document.querySelectorAll(".tab-nav li a");
  tabtitle.forEach(function (item) {
    // console.log(item);
    item.addEventListener("click", function (e) {
      e.preventDefault();
      //   메뉴탭에 화살표 활성기능
      tabtitle.forEach(function (element) {
        // console.log(element);
        element.classList.remove("active");
      });
      this.classList.add("active");
      //  메뉴탭에 해당하는 섹션내용이 바뀌는 코드
      const tabItem = document.querySelectorAll(".tabitem");
      tabItem.forEach(function (tab) {
        tab.style.display = "none";
      });
      console.log(this);
      const target = this.getAttribute("href");
      document.querySelector(target).style.display = "block";
    });
  });
  //   사이트가 로드됐을때 기본값(활성화된 값)
  tabtitle[0].click();
});
