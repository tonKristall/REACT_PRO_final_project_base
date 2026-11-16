import styles from './ErrorMessageField.module.css';

interface IErrorMessageFieldProps {
	message: string;
}

export const ErrorMessageField = ({ message }: IErrorMessageFieldProps) => {
	return <div className={styles.errorMessage}>{message}</div>;
};
