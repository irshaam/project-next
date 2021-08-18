export const tableStyle = {
  headRow: {
    style: {
      paddingTop: "0.75rem",
      paddingBottom: "0.75rem",
      borderTopStyle: "none",
      borderTopWidth: "1px",
      color: "rgba(107, 114, 128,1)",
      background: "rgba(249, 250, 251)",
    },
  },
  headCells: {
    style: {
      textTransform: "uppercase",
      color: "rgba(107, 114, 128,1)",
    },
  },
  cells: {
    style: {
      color: "rgba(107, 114, 128,1)",
      borderColor: "red",
    },
  },
  rows: {
    denseStyle: {
      paddingTop: "0.75rem",
      paddingBottom: "0.75rem",
    },
    style: {
      background: "rgba(249, 250, 251, 1)",
      "&:not(:last-of-type)": {
        borderColor: "#9900cc",
        border: "3px",
      },
    },
    stripedStyle: {
      background: "white",
      borderBottomColor: "red",
    },
  },
};
