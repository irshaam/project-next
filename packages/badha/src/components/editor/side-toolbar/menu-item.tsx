interface Props {
  icon: any;
  name: any;
  description?: any;
  onAddBlock(): void;
}
const MenuItem = (props: Props) => {
  const { icon, name, description, onAddBlock } = props;
  return (
    <button
      style={{ userSelect: "none" }}
      type="button"
      className="flex text-sm items-center mb-4"
      onMouseDown={(e) => {
        e.preventDefault();
        onAddBlock();
      }}
    >
      <div className="w-11 mr-4">{icon}</div>

      <div className="text-left">
        <div className="font-bold">{name}</div>
        {description && <div className="text-xs">{description}</div>}
      </div>
    </button>
  );
};
// ;Upload, or embed with /image [url]

export default MenuItem;
