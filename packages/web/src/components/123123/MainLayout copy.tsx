import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const subnav = [
  'މީހުންގެ ވާހަކަ',
  'ޕޮޑްކާސްޓްސް',
  'ކުޅިވަރު',
  'ފޮޓޯ ހަބަރު',
  'ވީޑިއޯ ސްޓޯރީ',
  'ކިޔުންތެރިން ޚިޔާރު',
  'މަގުބޫލު',
  'އެންމެ ފަސް',
  'ކިޔާލާން ހާއްސަ',
  'އެޑިޓަރުގެ ހޮވުން',
];
const MainLayout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className="min-h-screen container flex flex-col space-y-6 px-20">
      <div className="bg-gray-200 h-20 grid grid-cols-12 gap-10">
        <div className="h-20 bg-green-300 col-span-2">Search</div>
        <div className="h-20 bg-green-300 col-span-8">CategoryMenu</div>
        <div className="h-20 bg-green-300 col-span-2">Branding</div>
      </div>
      <div
        className="bg-white bg-opacity-80 transform -scale-y-100 overflow-hidden"
        style={{
          boxShadow: '0 -10px 24px 0 rgba(223,211,192,0.60)',
          borderRadius: '12px',
          height: '52px',
        }}
      >
        <nav className="flex  h-full w-full justify-center">
          {subnav.map((item, idx) => (
            <a
              className="bg-red-500 w-full border-transparent border-b-4 h-full flex items-center font-mv-waheed hover:border-red hover:text-opacity-40 cursor-pointer transition-colors ease-linear"
              key={`subnav_${idx}`}
              style={{
                fontSize: '22px',
                lineHeight: '22px',
                marginRight: '30px',
                marginLeft: '30px',
              }}
            >
              {item}
            </a>
          ))}
        </nav>
        {/* <div style={{ borderColor: '#FF3800' }}>some navigation</div>
        <div className="border-transparent border-b-4 h-full flex items-center font-bold mr-4 ml-4">
          some navigation
        </div>
        <div className="border-transparent border-b-4 h-full flex items-center font-bold mr-4 ml-4">
          some navigation
        </div>
        <div className="border-transparent border-b-4 h-full flex items-center font-bold mr-4 ml-4">
          some navigation
        </div>
        <div className="border-transparent border-b-4 h-full flex items-center font-bold mr-4 ml-4">
          some navigation
        </div> */}
      </div>
      {/* transform: scaleY(-1); background: rgba(255,255,255,0.80); ; */}

      <div className="bg-gray-200 grid grid-cols-12 gap-10">
        <div
          style={{ height: '160px' }}
          // style={{ height: '182px' }}
          className="h-20 bg-green-500 col-span-8 col-start-3"
        >
          mian article
        </div>
      </div>
      {/* <div className="bg-gray-200 h-20"></div>
      <div className="bg-gray-200 h-20"></div> */}
      {/* <div
        className="w-full border-b-2 border-black border-opacity-5"
        style={{ height: '80px' }}
      ></div> */}
      {/* <div className="grid grid-cols-12 gap-10 bg-gray-400 px-20">
        <div className="h-20 bg-green-300 col-span-2">Search</div>
        <div className="h-20 bg-green-300 col-span-8">CategoryMenu</div>
        <div className="h-20 bg-green-300 col-span-2">Branding</div>


        <div className="h-20 bg-green-300 col-span-3">subfeatured</div>

        <div className="h-20 bg-green-300 col-span-3">5</div>
        <div className="h-20 bg-green-300 col-span-3">6</div>
        <div className="h-20 bg-green-300 col-span-3">7</div>
        <div className="h-20 bg-green-300 col-span-3">8</div>

        <div className="-mx-10 h-20 bg-green-300 col-start-4 col-span-6">
          adv
        </div>

        <div className="h-20 bg-green-300 col-start-1 col-span-4 ">10</div>
        <div className="h-20 bg-green-300 col-span-4 ">11</div>
        <div className="h-20 bg-green-300 col-span-4 ">12</div>
      </div> */}
    </div>
  );
};
export default MainLayout;
// opacity: 0.06;
// border: 2px solid #000000;
