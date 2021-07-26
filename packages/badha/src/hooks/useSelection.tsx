import areEqual from "deep-equal";
import { useCallback, useRef, useState } from "react";

export default function useSelection(editor: any) {
  const [selection, setSelection] = useState(editor.selection);
  const previousSelection = useRef(null);
  const setSelectionOptimized = useCallback(
    (newSelection) => {
      if (areEqual(selection, newSelection)) {
        return;
      }
      previousSelection.current = selection;
      setSelection(newSelection);
    },
    [setSelection, selection]
  );

  return [previousSelection.current, selection, setSelectionOptimized];
}
