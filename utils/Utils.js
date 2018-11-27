var builder = require('botbuilder');

class Utils {

  createHeroCard(session, title, subtitle,author,text, img, buttonHref, buttonText) {
      return new builder.HeroCard(session).title(title).subtitle("published in: " + subtitle + "<br>Author: " + author + "<br>").text(text).images([builder.CardImage.create(session, img)]);
  }

  getCard(session,bookName,sinopis,published,image) {
     return new builder.Message(session)
            .addAttachment({
              contentType: "application/vnd.microsoft.card.adaptive",
              content: {
                  type: "AdaptiveCard",
                  "body": [
                      {
                        "speak": "Tom's Pie is a Pizza restaurant which is rated 9.3 by customers.",
                        "type": "ColumnSet",
                        "columns": [
                          {
                            "type": "Column",
                            "width": 2,
                            "items": [
                              {
                                "type": "TextBlock",
                                "text": "Book"
                              },
                              {
                                "type": "TextBlock",
                                "text": bookName,
                                "weight": "bolder",
                                "size": "extraLarge",
                                "spacing": "none"
                              },
                              {
                                "type": "TextBlock",
                                "text": "Published in:" + published,
                                "isSubtle": true,
                                "spacing": "none"
                              },
                              {
                                "type": "TextBlock",
                                "text": "4.2 ★★★☆ (93) · $$",
                                "isSubtle": true,
                                "spacing": "none"
                              },
                              {
                                "type": "TextBlock",
                                "text": "** " + sinopis + "\"",
                                "size": "small",
                                "wrap": true
                              }
                            ]
                          },
                          {
                            "type": "Column",
                            "width": 1,
                            "items": [
                              {
                                "type": "Image",
                                "url": image,
                                "size": "auto"
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
               });
  }
  getAuthorCard(session,name,biography,country,dateBirth) {
     return new builder.Message(session)
            .addAttachment({
              contentType: "application/vnd.microsoft.card.adaptive",
              content: {
                  type: "AdaptiveCard",
                  "body": [
                      {
                        "speak": name,
                        "type": "ColumnSet",
                        "columns": [
                          {
                            "type": "Column",
                            "width": 2,
                            "items": [
                              {
                                "type": "TextBlock",
                                "text": "Author"
                              },
                              {
                                "type": "TextBlock",
                                "text": name,
                                "weight": "bolder",
                                "size": "extraLarge",
                                "spacing": "none"
                              },
                               {
                                "type": "TextBlock",
                                "text": dateBirth,
                                "isSubtle": true,
                                "spacing": "none"
                              },
                              {
                                "type": "TextBlock",
                                "text": country,
                                "isSubtle": true,
                                "spacing": "none"
                              },
                              {
                                "type": "TextBlock",
                                "text": "** " + biography + "\"",
                                "size": "small",
                                "wrap": true
                              }
                            ]
                          },
                          {
                            "type": "Column",
                            "width": 1,
                            "items": [
                              {
                                "type": "Image",
                                "url": "https://picsum.photos/300?image=885",
                                "size": "auto"
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
               });
  }
}


module.exports = Utils;