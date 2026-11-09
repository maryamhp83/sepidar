"use client";

import { StaticBreadCrumbProps } from "@/type/component";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/component/ui/breadcrumb";
import React from "react";

export default function StaticBreadCrumb({
  values,
  className,
}: StaticBreadCrumbProps) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {values.map((item, index) => (
          <React.Fragment key={`static-breadcrumb-${index}`}>
            <BreadcrumbItem>
              <BreadcrumbLink>{item}</BreadcrumbLink>
            </BreadcrumbItem>
            {index + 1 !== values.length && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
