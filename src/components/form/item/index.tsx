import { DividerView, type Divider } from "./divider";
import { InputView, type Input } from "./input";
import { SelectView, type Select } from "./select";

export type Item = Divider | Input | Select;

export function ItemView(item: Item) {
  switch (item.type) {
    case "divider": {
      return <DividerView {...item} />;
    }
    case "input": {
      return <InputView {...item} />;
    }
    case "select": {
      return <SelectView {...item} />;
    }
  }
}
