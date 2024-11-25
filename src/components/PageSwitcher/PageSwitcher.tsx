import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import "./PageSwitcher.css";
import { PageData } from "../../pages/CocktailsPages/interfaces";
import useCustomSearchParams from "@/hooks/useCustomSearchParams";

interface PageSwitcherProps {
  metaData: PageData | null;
}

function PageSwitcher({ metaData }: PageSwitcherProps) {
  const [searchParams, setSearchParams] = useCustomSearchParams();

  if (metaData === null) return null;

  const perPage = searchParams.get("perPage") || "15";

  console.log("perPage: ", perPage);

  const { currentPage, firstPage, lastPage } = metaData;

  const handlePageClick = (page: number) => {
    setSearchParams({
      page: page.toString(),
    });
  };

  const handlePerPageChange = (value: string) => {
    setSearchParams({
      perPage: value,
    });
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

        {filterPages.map((pageNum, index) => {
          return (
            <PaginationItem key={index}>
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

      <Select value={perPage} onValueChange={handlePerPageChange}>
        <SelectTrigger className="w-[70px] per-page" value={15}>
          <SelectValue placeholder="15" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Cards per page</SelectLabel>
            <SelectItem value="9">9</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="24">24</SelectItem>
            <SelectItem value="36">36</SelectItem>
            <SelectItem value="45">45</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default PageSwitcher;
