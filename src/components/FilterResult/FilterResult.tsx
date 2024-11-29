import { useImmer } from "use-immer";
import { CustomSelect } from "..";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import "./FilterResult.css";
import { useEffect } from "react";
import useCustomSearchParams from "@/hooks/useCustomSearchParams";
import { FilterFields } from "../interfaces";

interface FilterData {
  [key: string]: string | null;
}

interface FilterResultProps {
  fields: FilterFields;
  searchPlaceholder: string;
}

function FilterResult({ fields, searchPlaceholder }: FilterResultProps) {
  const [filterData, setFilterData] = useImmer<FilterData>(() => {
    const initObj: FilterData = { name: null };

    Object.keys(fields).forEach(
      (fieldName: string) => (initObj[fieldName] = null)
    );

    return initObj;
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

      filterOption.forEach((name) => {
        draft[name] = searchParams.get(name.toString());
      });
    });
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const refactorObj = Object.fromEntries(
      Object.entries(filterData).filter(([, value]) => value !== null)
    ) as {
      [k: string]: string;
    };

    setSearchParams({ page: "1", ...refactorObj });
  };

  return (
    <form className="filter-result" onSubmit={handleSubmit}>
      <Input
        type="search"
        placeholder={searchPlaceholder}
        value={filterData.name || ""}
        className="search-name"
        onChange={(e) => handleFilterDataChange("name", e.target.value)}
      />
      {Object.entries(fields).map(([key, config]) => {
        return (
          <CustomSelect
            placeholder={config.placeholder}
            path={config.path}
            options={config.options}
            value={filterData[key] || ""}
            setValue={(value: string) => handleFilterDataChange(key, value)}
          />
        );
      })}
      <Button className="apply-filters">Filter</Button>
    </form>
  );
}

export default FilterResult;
