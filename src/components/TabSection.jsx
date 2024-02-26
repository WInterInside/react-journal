import Button from "./Button"
export default function TabSection({active, onChange}) {
	return (
		<section className="nav">
			<Button isActive={active === 'TeachingSection'} onClick={() => onChange('TeachingSection')}> TeachingSection </Button>
			<Button isActive={active === 'Differences'} onClick={() => onChange('Differences')}> Differences </Button>
			<Button isActive={active === 'Feedback'} onClick={() => onChange('Feedback')}> Feedback </Button>
			<Button isActive={active === 'Effects'} onClick={() => onChange('Effects')}> Effects </Button>
			<Button isActive={active === 'Journal'} onClick={() => onChange('Journal')}> Journal </Button>
		</section>
	)
}