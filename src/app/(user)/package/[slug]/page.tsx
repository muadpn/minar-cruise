import Bounded from "@/components/elements/Bounded";
import PackageForm from "@/components/package/new-page/PackageForm";
import PackageImage from "@/components/package/new-page/PackageImage";
import ProductCarousalIndexProvider from "@/components/package/new-page/ProductCarousalContextProvider";
import ProductCarousalProvider from "@/components/package/new-page/ProductCarousalProvider";
import ProductCarousalThumbButton from "@/components/package/new-page/ProductCarousalThumbButton";
import { PackageCarousel } from "@/components/packages/PackageCarousel";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { db } from "@/db";
import { getPackageById } from "@/db/data/dto/package";
import { constructMetadata } from "@/lib/helpers/constructMetadata";
import { cn, flattenObject } from "@/lib/utils";
import { MDXEditor } from "@mdxeditor/editor";
import { CheckCircle, CheckCircle2, CheckCircle2Icon } from "lucide-react";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import React from "react";
interface IPackagePage {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params: { slug },
}: IPackagePage): Promise<Metadata> {
  const packageMetadata = await db.package.findUnique({
    where: {
      slug,
    },
    select: {
      title: true,
      PackageSeo: {
        select: {
          seo: true,
        },
      },
    },
  });
  if (!packageMetadata) {
    return constructMetadata({
      MetaHeadtitle: {
        default: "Packages",
        template: "| Minar Cruise",
      },
    });
  }
  const seo = packageMetadata.PackageSeo[0].seo;
  // console.log(seo.structuredData?.geo)
  const data = JSON.parse(JSON.stringify(seo.structuredData));
  let flatted: any;
  try {
    flatted = flattenObject(data);
  } catch (error) {
    flatted = {};
  }
  return constructMetadata({
    MetaHeadtitle: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonicalUrl,
    },
    Ogimage: seo.ogImage,
    robots: seo.metaRobots,
    other: flatted,
  });
}

export async function generateStaticParams({ params: { slug } }: IPackagePage) {
  const packageSlug = await db.package.findMany({
    where: {
      packageCategory: {
        not: "CUSTOM",
      },
    },
    select: {
      slug: true,
    },
  });

  return packageSlug.map((item) => ({
    slug: item.slug,
  }));
}
export default async function PackagePage({ params: { slug } }: IPackagePage) {
  const data = await getPackageById({ slug });

  if (!data)
    return (
      <>
        <h1>Package doesn&apos;t Found</h1>
      </>
    );

  return (
    <Bounded className=" my-4 md:my-12 rounded-2xl ">
      <div className="  rounded-2xl">
        <div className="w-full h-full  flex   ">
          <div className="basis-3/4 max-h-[calc(100dvh-60px)]">
            <PackageImage data={data} />
          </div>
          <div className="px-0.5 mt-2 bg-white rounded-md md:rounded-none py-2 basis-1/4">
            <PackageForm
              adultPrice={data.adultPrice}
              childPrice={data.childPrice}
              packageId={data.id}
              packageCategory={data.packageCategory}
            />
          </div>
        </div>

        {/* <div className="mt-12">{"Content"}</div> */}
      </div>
      <div className=" mt-6 rounded-2xl px-4 py-6   ">
        <div className="max-w-4xl mx-auto w-full">
          <h4 className="text-2xl font-bold ">Amenities</h4>
          <p className="text-sm text-muted-foreground">
            Enjoy a variety of thoughtfully curated services and features,
            including dining, entertainment, and leisure activities, all
            designed to make your experience comfortable and memorable. Each
            package offers unique amenities to suit your preferences.
          </p>
          <div className="grid md:grid-cols-2 place-content-center gap-y-4 mt-3   ">
            {data.amenities.description.map((item, i) => {
              return (
                <p key={`${item}-${i}`} className="flex items-center gap-2  ">
                  <CheckCircle2 className="w-5 h-5  stroke-red-500" />
                  <span>{item}</span>
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex mx-auto bg-white rounded-2xl overflow-hidden justify-between">
          <Card className="border-none bg-white">
            <CardHeader>
              <CardTitle> Reserve Your Spot Today!</CardTitle>
              <CardDescription className="max-w-2xl w-full">
                Embark on a unique and entertaining
                <span className="font-medium text-black"> {data.title} </span>
                that combines scenic views, great food, and live performances,
                all while sailing through the tranquil Arabian Sea.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger className={cn(buttonVariants(), "")}>
                  Book your Seats Now
                </DialogTrigger>
                <DialogContent>
                  <PackageForm
                    adultPrice={data.adultPrice}
                    childPrice={data.childPrice}
                    packageId={data.id}
                    packageCategory={data.packageCategory}
                  />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
          <div className="max-w-sm ">
            <Image
              src={data.packageImage[0].image.url}
              alt={data.packageImage[0].image.alt}
              width={1280}
              height={720}
              className="object-cover aspect-video"
            />
          </div>
        </div>
      </div>
      <div className="mt-6 prose max-w-full w-full">
        <MDXRemote source={data.description} />
      </div>
      <PackageCarousel />
    </Bounded>
  );
}