import openai

openai.api_key = "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"

def generate_response(prompt):
  completions = openai.Completion.create(
    engine="text-davinci-002",
    prompt=prompt,
    max_tokens=1024,
    n=1,
    stop=None,
    temperature=0.5,
  )

  message = completions.choices[0].text
  return message.strip()

from baileys import WhatsApp

bot = WhatsApp()

@bot.on_message
def handle_message(sender, message):
  if message == "!menu":
    bot.send_message(sender, "Menu:")
    bot.send_message(sender, "1. Option 1")
    bot.send_message(sender, "2. Option 2")
    bot.send_message(sender, "3. Option 3")
  else:
    response = generate_response(message)
    bot.send_message(sender, response)

bot.run()
