"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useParams } from "next/navigation";
import React from "react";

export default function Detail() {
  const { detail_id } = useParams();
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <hr />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink href="/explore"> Khám Phá </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink>{detail_id}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </BreadcrumbList>
      </Breadcrumb>
      <hr />
      {/* Main content wrapper */}
      <div className="w-full flex px-14 flex-row items-center justify-center">
        <div className="w-1/2 flex flex-col items-start justify-start">
          <h1 className="text-4xl font-bold">{detail_id}</h1>
        </div>
        <div className="w-1/2 flex flex-col items-end justify-end">
          <p className="text-lg mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            ullamcorper, nunc et bibendum facilisis, nunc nisi aliquet nunc,
            eget aliquam nisl nunc eget nunc.Duis magna occaecat nostrud sint
            labore elit labore. Ad fugiat minim voluptate proident veniam
            commodo deserunt irure excepteur aliquip pariatur voluptate. Sunt
            incididunt pariatur aliquip ut nulla eu. Laborum ut amet cupidatat
            aliqua veniam non do in. In ad deserunt ut excepteur deserunt
            voluptate labore ut aute consequat laboris anim cupidatat.
          </p>
        </div>
      </div>

      {/* Image section */}
      <div className="w-full flex px-14 mt-15 ">
        <div className="w-1/2 flex flex-col items-start justify-start">
          <h1 className="text-4xl font-bold">Chi tiết</h1>
          <p className="text-lg mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            ullamcorper, nunc et bibendum facilisis, nunc nisi aliquet nunc,
            eget aliquam nisl nunc eget nunc.Magna esse velit excepteur est
            excepteur sunt non. Nostrud quis aute amet laboris est laboris
            commodo velit occaecat elit. Id quis ut et do adipisicing laborum
            non. Mollit veniam veniam proident ex elit laborum quis quis ullamco
            occaecat. Eiusmod tempor do do ipsum irure voluptate. Cupidatat
            mollit minim Lorem veniam laborum exercitation fugiat voluptate
            laborum ex. Adipisicing anim consequat nostrud veniam excepteur
            aliqua mollit et cillum.
          </p>
        </div>
        <div className="w-1/2 flex flex-col items-end justify-end">
          <img
            className="w-96 h-96 object-cover"
            src="https://placehold.co/400x300"
            alt="Detail Image"
          />
        </div>
      </div>

      <div className="w-full flex px-14 mt-15 ">
        <div className="w-1/2 flex flex-col items-start justify-start">
          <h1 className="text-4xl font-bold">Chi tiết</h1>
          <p className="text-lg mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            ullamcorper, nunc et bibendum facilisis, nunc nisi aliquet nunc,
            eget aliquam nisl nunc eget nunc.Magna esse velit excepteur est
            excepteur sunt non. Nostrud quis aute amet laboris est laboris
            commodo velit occaecat elit. Id quis ut et do adipisicing laborum
            non. Mollit veniam veniam proident ex elit laborum quis quis ullamco
            occaecat. Eiusmod tempor do do ipsum irure voluptate. Cupidatat
            mollit minim Lorem veniam laborum exercitation fugiat voluptate
            laborum ex. Adipisicing anim consequat nostrud veniam excepteur
            aliqua mollit et cillum.
          </p>
        </div>
        <div className="w-1/2 flex flex-col items-end justify-end">
          <img
            className="w-96 h-96 object-cover"
            src="https://placehold.co/400x300"
            alt="Detail Image"
          />
        </div>
      </div>
    </div>
  );
}
