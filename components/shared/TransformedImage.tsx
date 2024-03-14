import { TransformedImageProps } from "@/types";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import { dataUrl, debounce, getImageSize } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import React from "react";

const TransformedImage = ({
  image,
  type,
  title,
  transformationConfig,
  setIsTransforming,
  isTransforming,
  hasDownload = false,
}: TransformedImageProps) => {
  const downloadHandler = () => {};

  return (
    <div className="flex flex-col gap-4">
      <div className="flex-between">
        <h3 className={"h3-bold text-dark-600"}>Transformed</h3>

        {hasDownload && (
          <button className={"download-btn"} onClick={downloadHandler}>
            <Image
              src={"/assets/icons/download.svg"}
              alt={"download"}
              width={24}
              height={24}
              className={"pb-[6px]"}
            />
          </button>
        )}
      </div>

      {image?.publicId && transformationConfig ? (
        <div className="relative">
          <CldImage
            alt={"image"}
            src={image?.publicId}
            width={getImageSize(type, image, "width")}
            height={getImageSize(type, image, "height")}
            sizes={"(max-width: 767ox) 100vw, 50vw"}
            placeholder={dataUrl as PlaceholderValue}
            className={"transformed-image"}
            onLoad={() => {
              setIsTransforming && setIsTransforming(false);
            }}
            onError={() => {
              debounce(() => {
                setIsTransforming && setIsTransforming(false);
              }, 8000);
            }}
            {...transformationConfig}
          />

          {isTransforming && (
            <div className="transforming-loader">
              <Image
                src={"/assets/icons/spinner.svg"}
                alt={"spinner"}
                width={50}
                height={50}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="transformed-placeholder">Transformed Image</div>
      )}
    </div>
  );
};

export default TransformedImage;