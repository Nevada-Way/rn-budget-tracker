
export type BudgetTrack = {
	w:  number;
	r:  number;
	g:  number;
	b2: number;
	r2: number;
};

export function getBudgetTrack(): BudgetTrack {
	try {
		const res = {
            w: 4,
            r: 2,
            g: 4,
            b2: 2,
            r2: 8,
        }
		return res;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export function getBudgetTrackArray(): BudgetTrack[] {
	try {
		const res = [
            {
            w: 4,
            r: 2,
            g: 4,
            b2: 2,
            r2: 0,
        },
        {
            w: 7,
            r:2,
            g: 1,
            b2: 2,
            r2: 0,
        },
        {
            w: 8,
            r: 2,
            g: 0,
            b2: 2,
            r2: 0,
        },
        {
            w: 10,
            r: 0,
            g: 0,
            b2: 1.5,
            r2: 0.5,
        },
        {
            w: 10,
            r: 0,
            g: 0,
            b2: 1,
            r2: 1,
        },
        {
            w: 10,
            r: 0,
            g: 0,
            b2: 0,
            r2: 2,
        }
    
    ]
		return res;
	} catch (error) {
		console.error(error);
		throw error;
	}
}
