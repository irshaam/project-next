import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

// const subnav = [
//   'މީހުންގެ ވާހަކަ',
//   'ޕޮޑްކާސްޓްސް',
//   'ކުޅިވަރު',
//   'ފޮޓޯ ހަބަރު',
//   'ވީޑިއޯ ސްޓޯރީ',
//   'ކިޔުންތެރިން ޚިޔާރު',
//   'މަގުބޫލު',
//   'އެންމެ ފަސް',
//   'ކިޔާލާން ހާއްސަ',
//   'އެޑިޓަރުގެ ހޮވުން',
// ];

const DefaultLayout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className="min-h-screen container flex flex-col space-y-6 px-20">
      {/* {children} */}
    </div>
  );
};
export default DefaultLayout;
// opacity: 0.06;
// border: 2px solid #000000;
