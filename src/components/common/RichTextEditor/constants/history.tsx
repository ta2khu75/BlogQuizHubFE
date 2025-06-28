import { Redo, Undo } from "lucide-react";

export const HISTORY_TYPES = [
  {
    type: "undo",
    label: "Undo",
    icon: <Undo />,
  },
  {
    type: "redo",
    label: "Redo",
    icon: <Redo />,
  },
];
