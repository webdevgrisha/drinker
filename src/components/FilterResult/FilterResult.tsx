import { useImmer } from "use-immer";
import { CustomSelect } from "..";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import "./FilterResult.css";
import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import useFavoritesId from "@/hooks/useFavoritesId";
import useCustomSearchParams from "@/hooks/useCustomSearchParams";

interface FilterData {
  name?: string | null;
  glass?: string | null;
  category?: string | null;
  alcoholic?: string | null;
}

function FilterResult() {
  const [filterData, setFilterData] = useImmer<FilterData>({
    name: null,
    glass: null,
    category: null,
    alcoholic: null,
  });
  const [searchParams, setSearchParams] = useCustomSearchParams();

  const handleFilterDataChange = (name: keyof FilterData, value: string) => {
    setFilterData((draft) => {
      draft[name] = value === "None" ? null : value;
    });
  };

  useEffect(() => {
    setFilterData((draft) => {
      const filterOption = Object.keys(filterData) as Array<keyof FilterData>;

      filterOption.forEach((name) => (draft[name] = searchParams.get(name)));
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const refactorObj: { [key: string]: string } = Object.fromEntries(
      Object.entries(filterData).filter(([_, value]) => value !== null)
    );

    setSearchParams(refactorObj);
  };

  return (
    <form className="filter-result" onSubmit={handleSubmit}>
      <Input
        type="search"
        placeholder="Search by cocktail name"
        value={filterData.name || ""}
        className="search-name"
        onChange={(e) => handleFilterDataChange("name", e.target.value)}
      />
      <CustomSelect
        placeholder="Select a glass"
        path="/cocktails/glasses"
        value={filterData.glass || ""}
        setValue={(value: string) => handleFilterDataChange("glass", value)}
      />
      <CustomSelect
        placeholder="Select a categorie"
        path="/cocktails/categories"
        value={filterData.category || ""}
        setValue={(value: string) => handleFilterDataChange("category", value)}
      />
      <CustomSelect
        placeholder="Is Alcoholic"
        options={["true", "false"]}
        value={filterData.alcoholic || ""}
        setValue={(value: string) => handleFilterDataChange("alcoholic", value)}
      />
      <Button className="apply-filters">Filter</Button>
    </form>
  );
}

export default FilterResult;
