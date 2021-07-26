import Link from 'next/link';

type MenuProps = {
  title: string;
  path: string;
  icon?: any;
};

const MenuItem = (props: MenuProps) => {
  const { path, title, icon } = props;
  return (
    <Link href="#">
      <a className=" mr-7 ml-7 font-aammu text-menu flex items-center text-black hover:text-blue-500">
        {icon && icon}
        {title}
      </a>
    </Link>
  );
};

export default MenuItem;
