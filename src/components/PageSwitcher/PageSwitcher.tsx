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

  const { currentPage, firstPage, lastPage } =
    metaData;

  console.log("metaData:", metaData);

  const handlePageClick = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  const RenderPaginationItem = () => {
    const pageArr: number[] = [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];

    const filterPages: number[] = pageArr.filter(
      (pageNum) => pageNum >= 1 && pageNum <= lastPage
    );

    const renderFirst: boolean = pageArr[0] - 1 >= 1;
    const renderLast: boolean = lastPage - pageArr[4] >= 1;
    const renderPrevEllipsis: boolean = pageArr[0] - 1 > 1;
    const renderNextEllipsis: boolean = lastPage - pageArr[4] > 1;

    return (
      <>
        {renderFirst && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageClick(firstPage)}>
              {firstPage}
            </PaginationLink>
          </PaginationItem>
        )}

        {renderPrevEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {filterPages.map((pageNum) => {
          return (
            <PaginationItem>
              <PaginationLink
                onClick={() => handlePageClick(pageNum)}
                isActive={pageNum === currentPage}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {renderNextEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {renderLast && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageClick(lastPage)}>
              {lastPage}
            </PaginationLink>
          </PaginationItem>
        )}
      </>
    );
  };

  return (
    <div className="page-switcher">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() =>
                handlePageClick(currentPage - 1 >= 1 ? currentPage - 1 : 1)
              }
            />
          </PaginationItem>

          <RenderPaginationItem />

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                handlePageClick(
                  currentPage + 1 <= lastPage ? currentPage + 1 : lastPage
                )
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default PageSwitcher;
