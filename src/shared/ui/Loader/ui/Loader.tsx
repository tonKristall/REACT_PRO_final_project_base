import { CircularProgress } from '@mui/material';

type LoaderProps = {
	className?: string;
};

export const Loader = ({ className }: LoaderProps) => {
	return <CircularProgress className={className} />;
};
