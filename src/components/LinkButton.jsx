export default function LinkButton({ href, children, external }) {
  const base = "block w-full rounded border border-brand-secondary/40 bg-white/5 px-4 py-3 text-center text-brand-secondary text-green-400 hover:bg-brand-secondary/10 hover:shadow-glowGreen hover:drop-shadow-[0_0_15px_#3F853D] hover:scale-[1.04] transition duration-200"
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={base}>{children}</a>
  ) : (
    <a href={href} className={base}>{children}</a>
  )
}
