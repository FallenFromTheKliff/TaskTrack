export function filterByQuery<T>(items: T[], query: string, fields: (keyof T)[]): T[] {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(item =>
        fields.some(field => String(item[field]).toLowerCase().includes(q))
    );
}

export function groupByKey<T>(items: T[], keyFn: (item: T) => string): Map<string, T[]> {
    const map = new Map<string, T[]>();
    for (const item of items) {
        const key = keyFn(item);
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push(item);
    }
    return map;
}

export function sortGroupsAsc<T>(groups: Map<string, T[]>): [string, T[]][] {
    return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b));
}

export function sortGroupsDesc<T>(groups: Map<string, T[]>): [string, T[]][] {
    return Array.from(groups.entries()).sort(([a], [b]) => b.localeCompare(a));
}