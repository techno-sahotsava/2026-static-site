import heroAssets from "./heroSlideshowAssets.json";
import mobileHeroAssets from "./mobileHeroSlideshowAssets.json";

export interface HeroSlide {
  id: string;
  url: string;
  thumbUrl: string;
  width: number;
  height: number;
}

type HeroSlideAsset = {
  file: string;
  publicId: string;
  secureUrl: string;
  optimizedUrl: string;
  thumbUrl: string;
  width: number;
  height: number;
};

const mapHeroSlides = (assets: HeroSlideAsset[]): HeroSlide[] =>
  assets.map((asset, index) => ({
    id: `hero-slide-${index + 1}`,
    url: asset.optimizedUrl.replace("w_1920", "w_1200"),
    thumbUrl: asset.thumbUrl,
    width: asset.width,
    height: asset.height,
  }));

export const HERO_SLIDES = mapHeroSlides(heroAssets as HeroSlideAsset[]);
export const MOBILE_HERO_SLIDES = mapHeroSlides(mobileHeroAssets as HeroSlideAsset[]);

