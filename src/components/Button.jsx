export default function Button({children, isActive, ...props},) {
	return <button className={isActive ? 'isActive' : 'button'} {...props}>{children}</button>
}