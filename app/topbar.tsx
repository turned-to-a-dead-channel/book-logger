const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
});

const TopBar = () => {
    return (
        <nav className="fixed w-full z-50 border-b border-bordercolor bg-background/50 backdrop-blur-md flex">
            <div className="flex flex-row justify-between w-full">
                <div className='m-5'>
                    <span className="font-serif align-middle text-textlight text-3xl">The </span> 
                    <span className="font-serif align-middle text-amber text-3xl">Still </span> 
                    <span className="font-serif align-middle text-textlight text-3xl">Room</span> 
                    <span className="ml-5 align-middle font-mono uppercase tracking-wider-than-widest text-xs text-muted">Personal Library &middot; { today }</span>
                </div>
                <div className="m-5">
                    <button className="bg-amber text-xs align-middle text-textdark px-4 py-2 hover:bg-amber-2 rounded-4xl cursor-pointer">
                        + Log Session
                    </button>
                </div>
            </div>
        </nav>
    )
};

export default TopBar;