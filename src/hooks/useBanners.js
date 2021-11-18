import { ref } from "vue";
import { getBanners } from "@/api/home";

function useBanners() {
  const banners = ref();
  const getData = (distributionSite) => {
    getBanners(distributionSite).then((data) => {
      banners.value = data.result;
      console.log(banners);
    });
  };
  return { banners, getData };
}

export default useBanners;
