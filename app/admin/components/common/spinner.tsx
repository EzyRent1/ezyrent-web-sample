export const WhiteSpinner = () => {
  return (
    <div className="flex md:h-[50vh] mt-6 md:mt-0 items-center justify-center">
      <div className="bg-white shadow-md w-12 h-12 md:w-16 md:h-16 rounded-full p-2">
        <div
          className={`w-8 h-8 md:w-12 md:h-12 border-[3px] border-t-transparent border-gray-400 rounded-full animate-spin`}
        ></div>
      </div>
    </div>
  );
};
