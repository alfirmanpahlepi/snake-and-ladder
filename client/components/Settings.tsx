export default function Settings() {
    return (
        <div className="h-full w-full">
            <p className="text-right">number of player :
                <select>
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>
            <p className="text-right">number of dice :
                <select>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>
            <p className="text-right">timer :
                <select>
                    <option>10s</option>
                    <option>7s</option>
                    <option>5s</option>
                </select>
            </p>
        </div>
    )
}
