import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import getCotails from "@/services/cotails-api";
import { useQuery } from "@tanstack/react-query";

interface CustomSelectProps {
  value: string | null;
  setValue: (value: string) => void;
  placeholder: string;
  path?: string;
  options?: (string | boolean)[];
}

async function getDataForFilter({
  queryKey,
}: {
  queryKey: [string | undefined];
}) {
  const [path] = queryKey;

  console.log("search: ", path);
  const response = getCotails(`${path}`);

  return response;
}

function CustomSelect({
  value,
  setValue,
  path,
  placeholder,
  options = [],
}: CustomSelectProps) {
  console.log("value: ", value);

  const { data, error } = useQuery([path], getDataForFilter);

  console.log("data: ", { data, error });

  const dataParse: undefined | string[] = data?.data;

  const RenderSelectItems = () => {
    const optionArr = path ? dataParse : options;

    if (optionArr === undefined) return "Loading data";

    return optionArr.map((option: string | boolean) => {
      return <SelectItem value={String(option)}>{String(option)}</SelectItem>;
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
