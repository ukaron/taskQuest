import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shared/ui/breadcrumb";
import { Link, useRouterState } from "@tanstack/react-router";
import * as React from "react";

export const BreadcrumbsFeature = () => {
  const selected = useRouterState({
    select: (state) => state.location,
  });
  const links = selected.pathname.split("/").filter(Boolean); // убираем пустые элементы
  if (links.length < 1) return null;

  const current = links.pop();

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild href="/">
            <Link to="/">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {links.map((link, index) => (
          <React.Fragment key={link}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                asChild
                href={`/${links.slice(0, index + 1).join("/")}`}
              >
                <Link to={`/${links.slice(0, index + 1).join("/")}`}>
                  {link}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{current}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const getPageName = (id: string, i: number) => {
  return "test";
};
