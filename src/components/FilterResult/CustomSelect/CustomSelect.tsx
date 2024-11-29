import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import getData from "@/services/cotails-api";
import { useQuery } from "@tanstack/react-query";

interface CustomSelectProps {
  value: string | null;
  setValue: (value: string) => void;
  placeholder: string;
  path?: string;
  options?: (string | boolean)[];
  parseKey?: string;
}

async function getDataForFilter({
  queryKey,
}: {
  queryKey: [string | undefined];
}) {
  const [path] = queryKey;

  const response = getData(`${path}`);

  return response;
}

function CustomSelect({
  value,
  setValue,
  path,
  placeholder,
  options = [],
  parseKey,
}: CustomSelectProps) {
  const { data, error, loading } = useQuery([path], getDataForFilter, {
    enabled: !!path,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });

  let dataParse: undefined | [string, string][];

  if (parseKey && !loading) {
    dataParse = data?.data.map((dataObj: { [key: string]: string }) => [
      dataObj.id,
      dataObj[parseKey],
    ]);
  } else {
    dataParse = data?.data.map((value: string) => [value, value]);
  }

  const RenderSelectItems = () => {
    const refactorOptions = options?.map((value) => [value, value]);

    const optionArr = path ? dataParse : refactorOptions;

    if (optionArr === undefined) return "Loading data";

    return optionArr.map(([key, value]) => {
      return (
        <SelectItem value={String(key)} key={String(key)}>
          <span>{String(value)}</span>
        </SelectItem>
      );
    });
  };

  return (
    <Select
      value={value || ""}
      onValueChange={(value: string) => setValue(value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {loading && path !== undefined && (
          <SelectLabel>
            loading...
          </SelectLabel>
        )}
        <SelectGroup>
          <SelectLabel>
            {error && path !== undefined ? "Faild to load data" : placeholder}
          </SelectLabel>
          <SelectItem value="None">None</SelectItem>
          <RenderSelectItems />
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default CustomSelect;
