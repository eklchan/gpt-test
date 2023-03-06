/* eslint-disable no-undef */
import React from 'react'
import { Configuration, OpenAIApi } from 'openai'
import { Button, Flex, Heading, Input, Text } from '@chakra-ui/react'

const Test = () => {
  const [response, setResponse] = React.useState([
    {
      role: 'user',
      content:
        'pretend you are an agent for a company called 2men. Reply nice and politely to customers messages and refer them to my email john@gmail.com'
    }
  ])
  const [value, setValue] = React.useState('')
  const handleChange = (event) => setValue(event.target.value)

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  })
  console.log(process.env.OPENAI_API_KEY)
  const openai = new OpenAIApi(configuration)

  const postMessage = async (inputValue) => {
    let chatArray = [...response, { role: 'user', content: inputValue }]

    setValue('')
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: chatArray
    })
    console.log(completion.data.choices[0].message.content)
    setResponse([
      ...chatArray,
      { role: 'system', content: completion.data.choices[0].message.content }
    ])
  }

  return (
    <Flex p={8} height="100vh" flex="1" flexDir="column">
      <Heading>ChatGPT API TEST</Heading>
      <Flex flex="1" flexDir="column" py="4">
        {response.map((item, i) => {
          if (i > 0) {
            return (
              <Flex py="4" key={i}>
                <Text whiteSpace="pre-line">{item.content}</Text>
              </Flex>
            )
          }
        })}
      </Flex>
      <Flex gap={4}>
        <Input placeholder="Message" value={value} onChange={handleChange} />
        <Button onClick={() => postMessage(value)}>Send</Button>
      </Flex>
    </Flex>
  )
}

export default Test
