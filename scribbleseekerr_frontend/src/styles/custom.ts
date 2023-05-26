export const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    height: "3rem",
    background: "#1d1d1d",
    fontSize: "1.125rem",
    // match with the menu

    borderRadius: 8,
    // Overwrittes the different states of border
    borderColor: "transparent",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#F3F4F6" : "#F3F4F6",
    },
  }),
  menu: (base: any) => ({
    ...base,
    // override border radius to match the box

    borderRadius: 0,
    // kill the gap
    marginTop: 0,
  }),
  menuList: (base: any) => ({
    ...base,
    // kill the white space on first and last option

    padding: 12,
  }),
};
