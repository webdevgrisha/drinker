import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useNavigate, useSearchParams } from "react-router-dom";

import "./PageSwitcher.css";
import { PageData } from "../interfaces";

interface PageSwitcherProps {
  metaData: PageData | null;
}

function PageSwitcher({ metaData }: PageSwitcherProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  console.log("metaData:", metaData);
  if (metaData === null) return null;

  const { currentPage, firstPage, lastPage, previousPageUrl, nextPageUrl } =
    metaData;

  console.log("metaData:", metaData);

  const handlPrevNext = (value: string | null) => {
    if (value === null) return;

    navigate(value.slice(1));
  };

  const handlePageClick = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  return (
    <div className="page-switcher">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlPrevNext(previousPageUrl)}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={() => handlePageClick(firstPage)}>{firstPage}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          {/* <PaginationItem>
            <PaginationLink>{currentPage + 1}</PaginationLink>
          </PaginationItem> */}
          <PaginationItem>
            <PaginationLink onClick={() => handlePageClick(lastPage)}>{lastPage}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={() => handlPrevNext(nextPageUrl)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default PageSwitcher;
