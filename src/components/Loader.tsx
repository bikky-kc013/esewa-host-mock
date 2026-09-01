
type LoaderTypeProps = {
    size?:string;
    color?: string;
    text?:string;
}
const Loader = ({ size = 'md', color = 'border-blue-600', text }: LoaderTypeProps) => {
  // Map size props to Tailwind dimensions
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`animate-spin rounded-full border-solid border-t-transparent ${color} ${
          sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.md
        }`}
        role="status"
        aria-label="loading"
      />
      {text && <p className="text-sm font-medium text-gray-600">{text}</p>}
    </div>
  );
};

export default Loader;