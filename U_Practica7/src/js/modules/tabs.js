function tabs(tabsWrapperSelector, tabSelector, tabContentSelector, tabActive) {
  const tabs = document.querySelectorAll(tabSelector),
        tabsWrapper = document.querySelector(tabsWrapperSelector),
        tabContent = document.querySelectorAll(tabContentSelector);

  function hideTabContent() {
    tabContent.forEach(item => item.style.display = 'none');
    tabs.forEach(tab => tab.classList.remove(tabActive));
  }
  hideTabContent();

  function activeTabAndShowContent(i = 0) {
    tabContent[i].style.display = 'block';
    tabs[i].classList.add(tabActive);
  }
  activeTabAndShowContent();

  tabsWrapper.addEventListener('click', (event) => {
    if(event.target.classList.contains(tabSelector.slice(1))) {
      tabs.forEach((tab, i) => {
        if(event.target == tab) {          
          hideTabContent();
          activeTabAndShowContent(i);
        }
      })
    }
  });
};

export default tabs;