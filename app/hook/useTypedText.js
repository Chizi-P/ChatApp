import React from 'react'

export default useTypedText = (fullText = '', interval = 80) => {
    const [text, setText] = React.useState('')

    React.useEffect(() => {

        if (text === fullText) return

        const timeout = setTimeout(() => {
            setText(fullText.toString().slice(0, text.length + 1))
        }, interval)

        return () => clearTimeout(timeout)
    }, [fullText, text])

    return text
}
