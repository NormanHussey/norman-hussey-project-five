export default function determineMaxQty({ price }, { money, maxInventory, inventory}) {
    const maxAffordable = Math.floor(money / price);
    const maxAvailableSpace = maxInventory - inventory.length;
    return Math.min(maxAffordable, maxAvailableSpace);
};