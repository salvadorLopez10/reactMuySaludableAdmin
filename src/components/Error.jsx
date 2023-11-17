const Error = ({ children }) => {
  return (
    <div className="bg-red-700 text-white text-center p-3 uppercase font-bold mb-3 rounded-md my-3">
      <p className="bg-red-700">{children}</p>
    </div>
  );
};

export default Error;
