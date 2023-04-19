import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

const variants = {
	in: {
		opacity: 1,
		transition: {
			duration: 0.25,
		},
	},
	out: {
		opacity: 0,
		transition: {
			duration: 0.25,
		},
	},
};

export default function TransitionEffect1({
	children,
}: {
	children: React.ReactNode;
}) {
	const { asPath } = useRouter();

	return (
		<div className="overflow-hidden">
			<AnimatePresence initial={false} mode="wait">
				<motion.div
					key={asPath}
					variants={variants}
					animate="in"
					initial="out"
					exit="out"
				>
					{children}
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
